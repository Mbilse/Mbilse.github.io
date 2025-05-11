cd
cd ./MbilseCare

mkdir "LoginData" > /dev/null 2>&1
cd ./LoginData
# Login
echo " "
sleep 0.5
touch userdata.txt
echo "Username:$username
Password:$password" > userdata.txt
echo "Login Done!"
