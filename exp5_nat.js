// Exp 5 - Static NAT (RT1 LAN, RT2 border, RT3 WAN)
addDevice("RT1", "1841", 150, 150);
addDevice("RT2", "1841", 300, 150);
addDevice("RT3", "1841", 450, 150);
addDevice("PC1", "PC-PT", 150, 320);
addDevice("PC2", "PC-PT", 450, 320);

addLink("PC1", "FastEthernet0", "RT1", "FastEthernet0/0", "cross");
addLink("RT1", "FastEthernet0/1", "RT2", "FastEthernet0/0", "cross");
addLink("RT2", "FastEthernet0/1", "RT3", "FastEthernet0/0", "cross");
addLink("RT3", "FastEthernet0/1", "PC2", "FastEthernet0", "cross");

configurePcIp("PC1", false, "192.168.1.2", "255.255.255.0", "192.168.1.1");
configurePcIp("PC2", false, "30.0.0.2", "255.255.255.0", "30.0.0.1");

configureIosDevice("RT1", [
  "enable",
  "configure terminal",
  "hostname RT1",
  "interface fa0/0",
  "ip address 192.168.1.1 255.255.255.0",
  "no shutdown",
  "interface fa0/1",
  "ip address 10.0.0.1 255.255.255.252",
  "no shutdown",
  "exit",
  "ip route 0.0.0.0 0.0.0.0 10.0.0.2",
  "end"
].join("\n"));

configureIosDevice("RT2", [
  "enable",
  "configure terminal",
  "hostname RT2",
  "interface fa0/0",
  "ip address 10.0.0.2 255.255.255.252",
  "ip nat inside",
  "no shutdown",
  "interface fa0/1",
  "ip address 20.0.0.1 255.255.255.252",
  "ip nat outside",
  "no shutdown",
  "exit",
  "ip route 192.168.1.0 255.255.255.0 10.0.0.1",
  "ip route 30.0.0.0 255.255.255.0 20.0.0.2",
  "ip nat inside source static 192.168.1.2 20.0.0.10",
  "end"
].join("\n"));

configureIosDevice("RT3", [
  "enable",
  "configure terminal",
  "hostname RT3",
  "interface fa0/0",
  "ip address 20.0.0.2 255.255.255.252",
  "no shutdown",
  "interface fa0/1",
  "ip address 30.0.0.1 255.255.255.0",
  "no shutdown",
  "exit",
  "ip route 20.0.0.10 255.255.255.255 20.0.0.1",
  "end"
].join("\n"));
