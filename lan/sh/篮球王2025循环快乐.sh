#过新年时,将代码发屏幕录制视频
sleep 1
while true
do
sleep 0.001
set +x
let "j=j+1"
echo "\033[32;;1m2025年>🧡新年快乐🧡$j \033[49;;1m"
done