echo ""
echo "Loading... 
"
sleep 1
echo "UnInstall MbilseCare 4.0.3"
echo "2.5MB /0B loading..."
echo "
"
sleep 1
echo "
Waiting for headers..."
sleep 1.36
printf "progress:"
sleep 0.1
printf "#"
sleep 1
printf "#"
sleep 0.6
printf "#"
sleep 0.5
printf "#"
sleep 0.4
printf "#"
sleep 1
printf "#"
sleep 0.5
printf "#"
sleep 0.8
printf "#"
sleep 0.5
printf "#"
sleep 1.4
printf "#"

echo ""
sleep 0.5
echo "
uninstalling..."
sleep 0.3
printf "progress:"
sleep 0.4
printf "#"
cd
sleep 1.3
printf "#"
sleep 1.6
mkdir "MbilseCare" > /dev/null 2>&1
printf "#"
cd ./MbilseCare
touch config.txt
sleep 0.7
echo "awim.kernel=\"<UNKNOWN>\"
app.build=\"none\"
app.install=\"grand\"
bin.keysoft=\"keysoft\"
bin.keys=\"<UNKNOWN>\"
clip.storebin=\"yes\"
clip.install=\"uninstalled\"
system.version=\"<UNKNOWN>\"
system.osname=\"<UNKNOWN>\"
system.ostype=\"<UNKNOWN>\"
user.name=\"<UNKNOWN>\"
user.email=\"<UNKNOWN>\"
" > config.txt
printf "#"
touch list.txt
echo "<UNKNOWN>" > list.txt
sleep 2.1
printf "#"
touch init.txt
echo "<UNKNOWN>" > init.txt

sleep 1.8
printf "#"
sleep 1.2
printf "#"
sleep 2.3
printf "#"
sleep 1.5
printf "#"
sleep 1.7
printf "#"

echo ""
sleep 0.2
echo "MbilseCare (4.0.3) 2.5MB uninstall done!"
