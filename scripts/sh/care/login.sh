cd
cd ./MbilseCare

mkdir "LoginData" > /dev/null 2>&1
cd ./LoginData
# Login
echo " "
sleep 0.5
printf "Username:"
read username
case $username in
Mbilse)
;;
esac
sleep 7
printf "Password:"
read password
case $password in
Mbilse)
;;
esac
sleep 7
touch userdata.txt
echo "Username:$username
Password:$password" > userdata.txt
echo "Login Done!"
