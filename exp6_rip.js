// Exp 6 - RIP v2 across R1, R2, R3
addDevice("R1", "1841", 150, 150);
addDevice("R2", "1841", 300, 150);
addDevice("R3", "1841", 450, 150);
addDevice("PC1", "PC-PT", 150, 320);
addDevice("PC2", "PC-PT", 450, 320);

// HWIC-2T gives the serial ports Se0/0/0 and Se0/0/1 (modules must be added before links)
addModule("R1", "0/0", "HWIC-2T");
addModule("R2", "0/0", "HWIC-2T");
addModule("R3", "0/0", "HWIC-2T");

addLink("PC1", "FastEthernet0", "R1", "FastEthernet0/0", "cross");
addLink("R1", "Serial0/0/0", "R2", "Serial0/0/0", "serial");
addLink("R2", "Serial0/0/1", "R3", "Serial0/0/1", "serial");
addLink("R3", "FastEthernet0/0", "PC2", "FastEthernet0", "cross");

configurePcIp("PC1", false, "192.168.1.2", "255.255.255.0", "192.168.1.1");
configurePcIp("PC2", false, "192.168.2.2", "255.255.255.0", "192.168.2.1");

// clock rate is set on both ends of each serial link; the DTE side just prints a harmless error
configureIosDevice("R1", [
  "enable",
  "configure terminal",
  "hostname R1",
  "interface fa0/0",
  "ip address 192.168.1.1 255.255.255.0",
  "no shutdown",
  "interface se0/0/0",
  "ip address 10.0.0.1 255.255.255.252",
  "clock rate 64000",
  "no shutdown",
  "exit",
  "router rip",
  "version 2",
  "no auto-summary",
  "network 192.168.1.0",
  "network 10.0.0.0",
  "end"
].join("\n"));

configureIosDevice("R2", [
  "enable",
  "configure terminal",
  "hostname R2",
  "interface se0/0/0",
  "ip address 10.0.0.2 255.255.255.252",
  "clock rate 64000",
  "no shutdown",
  "interface se0/0/1",
  "ip address 20.0.0.1 255.255.255.252",
  "clock rate 64000",
  "no shutdown",
  "exit",
  "router rip",
  "version 2",
  "no auto-summary",
  "network 10.0.0.0",
  "network 20.0.0.0",
  "end"
].join("\n"));

configureIosDevice("R3", [
  "enable",
  "configure terminal",
  "hostname R3",
  "interface se0/0/1",
  "ip address 20.0.0.2 255.255.255.252",
  "clock rate 64000",
  "no shutdown",
  "interface fa0/0",
  "ip address 192.168.2.1 255.255.255.0",
  "no shutdown",
  "exit",
  "router rip",
  "version 2",
  "no auto-summary",
  "network 20.0.0.0",
  "network 192.168.2.0",
  "end"
].join("\n"));
