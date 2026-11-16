// Exp 4 - Router Configuration (Cisco 1841)
addDevice("R1", "1841", 300, 150);
addDevice("PC1", "PC-PT", 120, 300);
addDevice("PC2", "PC-PT", 480, 300);

addLink("PC1", "FastEthernet0", "R1", "FastEthernet0/0", "cross");
addLink("PC2", "FastEthernet0", "R1", "FastEthernet0/1", "cross");

configurePcIp("PC1", false, "192.168.1.2", "255.255.255.0", "192.168.1.1");
configurePcIp("PC2", false, "192.168.2.3", "255.255.255.0", "192.168.2.1");

configureIosDevice("R1",
  "enable\n" +
  "configure terminal\n" +
  "hostname R1\n" +
  "interface fa0/0\n" +
  "ip address 192.168.1.1 255.255.255.0\n" +
  "no shutdown\n" +
  "exit\n" +
  "interface fa0/1\n" +
  "ip address 192.168.2.1 255.255.255.0\n" +
  "no shutdown\n" +
  "exit\n" +
  "end\n");
