function check_installed(){
echo "[*] Checking if http-server is installed..."
package="http-server"
if [ `npm list -g | grep -c $package` -eq 0 ]; then
    echo "[-] Package not installed. Installing..."
    sudo npm install $package -g
else
    echo "[+] Package already installed."
fi
}

check_installed
http-server -c1