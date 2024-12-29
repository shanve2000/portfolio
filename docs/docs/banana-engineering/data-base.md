---
sidebar_position: 1
---

# Data Base

# InfluxDB Setup Guide for Banana Portfolio

This guide provides detailed instructions for setting up and managing the InfluxDB instance for the Banana Portfolio.

---

## **InfluxDB Configuration**

### **Organization Details**
- **Organization Name**: `maxqinfotech`
- **Bucket Name**: `portfolio`

### **User Credentials**
- **Username**: `banana`
- **Password**: `banana@1411`

### **API Key**
```bash
ntOxTYDetN6F8_aNpijVrDQB2AyHDv4R3RggXJwVJfovpKD33bupABTn8bK8cphZzBvCtkNvir3IH7ugt_l-8g==
```

---

## **Starting and Managing InfluxDB**

### **Start the InfluxDB Server**

To start the InfluxDB server using Homebrew:
```bash
brew services start influxdb
```

### **Stop the InfluxDB Server**
To stop the InfluxDB server:
```bash
brew services stop influxdb
```

### **Run InfluxDB Manually**
If you prefer running InfluxDB manually for testing:
```bash
influxd
```

---

## **Interacting with InfluxDB**

### **Using REST API**
- Use tools like `curl` or **Postman** to interact with InfluxDB's REST API.
- Base URL for API requests:
  - `http://localhost:8086`

### **Modify Configuration**
If configuration changes are required, open the default configuration file:
```bash
nano /usr/local/etc/influxdb.conf
```
After making changes, restart the InfluxDB service:
```bash
brew services restart influxdb
```

---

## **Accessing InfluxDB CLI**
To log into the InfluxDB CLI:
```bash
influx
```

Once logged in, you can perform various operations like creating buckets, querying data, and managing users.

---

## **Security Reminder**
Ensure that credentials and API keys are stored securely and not shared publicly. Use environment variables or a secrets management tool to protect sensitive information.

---
