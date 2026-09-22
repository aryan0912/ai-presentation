# National Dairy Development Board (NDDB)
## Standard Operating Procedure (SOP): Bulk Milk Cooling (BMC) Centers & Thermal Management

- **Document Identifier**: `SOP-NDDB-ENG-CH-2026-09`
- **Issuing Directorate**: Directorate of Cold Chain Logistics & Dairy Engineering
- **Facility Reference**: Anand Central Hub, Mehsana Satellite BMC, Kheda North Cooperative BMCs
- **Effective Date**: January 15, 2026
- **Version**: Rev 5.1
- **Target Audience**: Chilling center managers, lead refrigeration technicians, IoT telemetry monitoring engineers, and autonomous cold-chain agents.

---

### Section 1: Cold-Chain Quality Preservation & Thermal Standards

#### 1.1 Critical Quality Rationale
Raw milk procured at ambient temperatures (30°C – 35°C) from Village Dairy Cooperative Societies (VDCS) exhibits rapid microbial proliferation (notably lactic acid bacteria and psychrotrophs) if not rapidly chilled. To preserve microbiological quality and comply with Food Safety and Standards Authority of India (FSSAI) benchmarks:
- **Intake-to-Chill Time Window**: Raw milk must be chilled from ambient arrival temperature to **below 4.0°C within 120 minutes (2 hours)** of milking.
- **Microbial Inactivation**: Maintaining milk temperatures below 4.0°C keeps bacterial counts stable for up to 48 hours prior to road tanker dispatch to the mother dairy processing plant.

#### 1.2 Thermal Operating Thresholds
Every Bulk Milk Chiller (BMC) unit operating across NDDB facilities is continuously governed by four strict thermal bands:

| Operating Band | Temperature Range | State Description | System Action / Protocol |
| :--- | :--- | :--- | :--- |
| **Optimal Operating Range** | **3.5°C to 4.0°C** | Target preservation temperature | Thermostat cycles compressor automatically. Normal agitation speed. |
| **Acceptable Fluctuation** | 3.0°C to 4.5°C | Minor transient during fresh milk loading | Agitator active. Compressor operating at nominal power. |
| **Warning Alert Threshold** | **> 4.5°C** | Thermal excursion detected | IoT edge telemetry flags warning; automated alert sent to center technician. |
| **Critical Excursion Alert** | **> 6.0°C for > 45 mins** | Severe cold-chain breakdown | Automated milk rejection alarm. Requires mandatory laboratory MBRT test and milk quarantine. |

---

### Section 2: Chiller Unit Hardware Inventory & Specifications

The Anand Central Hub and affiliated cooperative satellite centers maintain high-efficiency direct-expansion (DX) and indirect glycol chilling units. The authoritative hardware register is maintained below:

| Unit ID | Location / Bay | Model / Compressor | Capacity | Refrigerant | Normal Suction Pressure | Normal Discharge Pressure | Nominal Power |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`CH-01`** | Anand Central BMC - Bay A | Danfoss Scroll SM120 | 5,000 Liters | R404A | 3.8 – 4.4 bar | 15.0 – 17.5 bar | 14.5 kW |
| **`CH-02`** | Anand Central BMC - Bay A | Danfoss Scroll SM120 | 5,000 Liters | R404A | 3.8 – 4.4 bar | 15.0 – 17.5 bar | 14.1 kW |
| **`CH-03`** | Anand Central BMC - Bay B | Copeland Discus 4DA | 10,000 Liters | R134a | 2.1 – 2.8 bar | 13.5 – 16.0 bar | 22.4 kW |
| **`CH-04`** | **Anand Central BMC - Bay B** | **Copeland Discus 4DA** | **10,000 Liters** | **R134a** | **2.1 – 2.8 bar** | **13.5 – 16.0 bar** | **26.8 kW** |
| **`CH-05`** | Kheda North Center | Emerson Semi-Hermetic | 3,000 Liters | R404A | 3.9 – 4.5 bar | 15.2 – 18.0 bar | 11.2 kW |
| **`CH-06`** | Mehsana Satellite BMC | Bitzer ECOLINE 4VES | 5,000 Liters | R407C | 3.5 – 4.2 bar | 14.8 – 17.2 bar | 15.3 kW |

---

### Section 3: Anomaly Diagnosis & Troubleshooting Runbook for Chiller 4 (`CH-04`)

Chiller unit **`CH-04`** at Anand Central BMC (Bay B) is the primary high-volume bulk cooling vessel (10,000 L capacity, Copeland Discus 4DA reciprocating compressor, charged with 18.5 kg of DuPont Suva R134a refrigerant).

#### 3.1 Primary Anomaly Signature: High Discharge Pressure & Temperature Excursion
- **Telemetry Signature**: Discharge pressure rising above **18.5 bar** (nominal: 13.5 – 16.0 bar) accompanied by bulk milk temperature exceeding **4.5°C** (peaking at or near **5.2°C**).
- **Potential Root Causes**: Condenser fouling, cooling fan motor failure, high ambient temperature (> 33°C), thermal expansion valve (TXV) contact loss, or non-condensable gas entrapment in refrigerant circuit.

#### 3.2 Step-by-Step Diagnostic & Rectification Protocol
Technicians and automated diagnostics agents must follow this sequential procedure:

1. **Step 1: Condenser Fan Inspection & Airflow Check**
   - Verify electrical supply at the condenser fan motor relay (contactor `KM2`).
   - Check if the thermal overload relay (`FR1`) has tripped.
   - Inspect finned aluminum coils for dust, lint, or agricultural particulate buildup. Clear immediately with low-pressure compressed air (4.0 bar max).

2. **Step 2: Thermal Expansion Valve (TXV) Verification**
   - Inspect the sensing bulb of the Danfoss TXV clamped on the suction line.
   - Ensure the bulb is mounted at the 4 o'clock or 8 o'clock position with tight copper clamping and insulated with closed-cell elastomeric foam.
   - If the sensing bulb has detached or lost thermal contact, the valve floods the evaporator or starves the coil, inducing pressure anomalies.

3. **Step 3: Cooling Water & Heat Exchanger Verification**
   - For water-cooled auxiliary condensers, inspect cooling water inlet line pressure gauge. Minimum pressure must exceed **2.5 bar**.
   - Verify cooling tower fan rotation and recirculating pump discharge.

4. **Step 4: Emergency Escalation & Standby Loop Switchover**
   - If bulk milk temperature breaches **5.0°C** and does not decrease within 15 minutes of Step 1–3 interventions:
     - Immediately isolate the primary refrigerant circuit and activate the **secondary standby glycol cooling loop (Circuit B)**.
     - Dispatch an emergency audible alarm to Anand BMC floor supervisors.
     - Automatically raise a **P1 Critical Incident Ticket** in the NDDB ICT Service Management portal (matching format `INC-4471`).

---

### Section 4: Automated IoT Telemetry & Sensor Calibration

#### 4.1 Telemetry Infrastructure & Transmission
- **Sensor Types**: Dual Class-A PT100 RTD temperature probes (submerged in milk tank and suction manifold), piezoresistive pressure transmitters (4–20mA), and Schneider Electric digital power transducers.
- **Protocol**: Sensors communicate over an RS-485 serial bus using **Modbus TCP** at 9600 baud to the Advantech industrial IoT edge gateway.
- **Sampling Interval**: Telemetry is polled continuously every **60 seconds**.
- **Central Storage**: The edge gateway streams authenticated readings into the central Neon PostgreSQL database table: `chiller_telemetry`.

#### 4.2 Data Ingestion Schema (`chiller_telemetry`)
Readings published from IoT gateways match the database definition:
- `chiller_id`: Unit identifier (`CH-01` through `CH-06`).
- `temperature_celsius`: Submerged milk bulk temperature (Target: 3.5°C – 4.0°C).
- `discharge_pressure_bar`: Compressor high-side pressure.
- `suction_pressure_bar`: Compressor low-side pressure.
- `power_kw`: Instantaneous electrical load.
- `ambient_temp_celsius`: Ambient ambient dry-bulb temperature.
- `alarm_active`: Boolean flag set to `TRUE` whenever `temperature_celsius > 4.5` or `discharge_pressure_bar > 18.0`.

---

### Section 5: CIP (Clean-in-Place) Sanitation & Maintenance Intervals

- **Daily CIP**: Pre-rinse with potable water at 40°C, alkaline wash with 1.0% NaOH at 65°C for 20 minutes, intermediate rinse, acid wash with 0.5% HNO3 at 55°C, final rinse.
- **Weekly Preventive Maintenance**: Lubrication of agitator motor bearings, refrigerant sight glass moisture indicator verification (must display dry green).
- **Monthly Sensor Calibration**: Two-point calibration of PT100 temperature sensors against a certified NABL secondary reference thermometer at 0.0°C and 10.0°C.
