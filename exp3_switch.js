// Exp 3 - Switch Configuration (Cisco 2960)
addDevice("SW1", "2960-24TT", 300, 120);
addDevice("PC1", "PC-PT", 150, 300);
addDevice("PC2", "PC-PT", 450, 300);

addLink("PC1", "FastEthernet0", "SW1", "FastEthernet0/1", "straight");
addLink("PC2", "FastEthernet0", "SW1", "FastEthernet0/2", "straight");

configurePcIp("PC1", false, "192.168.1.2", "255.255.255.0");
configurePcIp("PC2", false, "192.168.1.3", "255.255.255.0");
