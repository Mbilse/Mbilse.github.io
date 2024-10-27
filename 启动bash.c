#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>

#define MAX_LINE 1024
#define MAX_ARGS 128
#define MAX_PIPES 10

char *parse_line(char *cmdline, char **argv, int max_args) {
    char *argv_index[MAX_ARGS];
    int argc = 0;
    char *token = strtok(cmdline, " \t\r\n");
    while (token != NULL) {
        argv_index[argc++] = token;
        token = strtok(NULL, " \t\r\n");
    }
    argv[0] = argv_index[0];
    for (int i = 1; i < argc; i++) {
        argv[i] = argv_index[i];
        argv[i - 1] = argv_index[i - 1] + strlen(argv_index[i - 1]) + 1;
    }
    argv[argc] = NULL;
    return cmdline;
}

void execute(char **argv) {
    if (argv[0] == NULL) {
        return;
    }

    pid_t pid = fork();
    if (pid == -1) {
        perror("fork");
        exit(1);
    } else if (pid == 0) {
        if (execvp(argv[0], argv) == -1) {
            perror("execvp");
            exit(EXIT_FAILURE);
        }
    } else {
        wait(NULL);
    }
}

int main() {
    char line[MAX_LINE];
    char *argv[MAX_ARGS];
    int pipe_count = 0;
    int fds[2], pid;

    while (1) {
        printf(">>> ");
        if (!fgets(line, sizeof(line), stdin)) {
            break;
        }

        if (line[0] == '\n') {
            continue;
        }

        // Check for pipe
        if (strchr(line, '|') != NULL) {
            if (pipe_count < MAX_PIPES) {
                if (pipe(fds) == -1) {
                    perror("pipe");
                    exit(1);
                }
                char *pline = strtok(line, "|");
                while (pline != NULL) {
                    parse_line(pline, argv, MAX_ARGS);
                    if (fork() == 0) {
                        if (pipe_count > 0) {
                            dup2(fds[0], STDIN_FILENO);
                        }
                        close(fds[1]);
                        execute(argv);
                        exit(0);
                    }
                    wait(NULL);
                    if (pline != strtok(NULL, "|")) {
                        close(fds[0]);
                        if (pipe(fds) == -1) {
                            perror("pipe");
                            exit(1);
                        }
                    }
                    pline = strtok(NULL, "|");
                }
                close(fds[1]);
                pipe_count--;
            } else {
                fprintf(stderr, "Too many pipes\n");
            }
        } else {
            parse_line(line, argv, MAX_ARGS);
            execute(argv);
        }
    }

    return 0;
}