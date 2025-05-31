cd
cd ./MbilseCare

mkdir "LoginData" > /dev/null 2>&1
cd ./LoginData
# Login
username="Mbilse"
password="131023"
echo " "
sleep 0.5
echo "Username:$username
Password:$password"

touch userdata.txt
echo "Username:$username
Password:$password" > userdata.txt
echo "Login Done!"
