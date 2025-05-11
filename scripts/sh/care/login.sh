cd
cd ./MbilseCare

mkdir "LoginData" > /dev/null 2>&1
cd ./LoginData
# Login
echo " "
sleep 0.5
printf "Username:"
read username
sleep 7
printf "Password:"
read password
sleep 7
touch userdata.txt
echo "Username:$username
Password:$password" > userdata.txt
echo "Login Done!"
