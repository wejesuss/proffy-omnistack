import os from 'os';

interface netInterface {
    ifname: string;
    address: string;
}

function getMyIPAddress(
    ifaceName: 'Wi-Fi' | 'LAN' | 'Loopback Pseudo-Interface 1'
): netInterface {
    const ifaces = os.networkInterfaces();
    let netInterface = { ifname: '', address: '' };
    Object.keys(ifaces).forEach((ifname) => {
        ifaces[ifname]?.forEach((iface) => {
            if (iface.family !== 'IPv4' || iface.internal !== false) {
                return;
            }

            if (ifname.includes(ifaceName)) {
                netInterface = {
                    ifname,
                    address: iface.address,
                };
            }
        });
    });

    return netInterface;
}

export default getMyIPAddress;
