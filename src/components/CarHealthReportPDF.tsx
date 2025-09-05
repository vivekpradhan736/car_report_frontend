import { Document, Page, Text, View, Image, StyleSheet, Svg, Path, Link } from "@react-pdf/renderer";
import { CarHealthData } from "./CarHealthReportForm";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
    fontSize: 11,
    color: '#374151',
    lineHeight: 1.4,
  },
  reportContainer: {
    maxWidth: 595,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  header: {
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerRight: {
    textAlign: 'right',
    fontSize: 12,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    borderBottomStyle: 'solid',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitleBar: {
    width: 4,
    height: 20,
    backgroundColor: '#3B82F6',
    marginRight: 10,
    borderRadius: 12,
  },
  carDetails: {
    backgroundColor: '#F8FAFC',
    paddingTop: 10,
    paddingLeft: 3,
    paddingRight: 3,
    borderRadius: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailItem: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 13,
    marginBottom: 12,
    paddingLeft: 5,
    paddingRight: 5,
  },
  detailLabel: {
    fontWeight: 'normal',
    color: '#4A5568',
  },
  detailValue: {
    fontWeight: 'bold',
    color: '#1A202C',
  },
  healthScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  scoreGauge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  gaugeBg: {
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  gaugeInner: {
    width: 90,
    height: 90,
    backgroundColor: "#ffffff",
    borderRadius: 45,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  scoreInner: {
    width: 90,
    height: 90,
    backgroundColor: '#ffffff',
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  scoreNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  scoreText: {
    fontSize: 10,
    color: '#718096',
    marginTop: 2,
  },
  scoreInfo: {
    flex: 1,
  },
  scoreStatus: {
    fontSize: 18,
    fontWeight: 'bold',
    // color: '#F2C94C',
    marginBottom: 8,
  },
  scoreDescription: {
    color: '#4A5568',
    fontSize: 14,
    lineHeight: 1.4,
  },
  findingsTable: {
    marginTop: 10,
  },
  tableHeader: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#E2E8F0',
    borderBottomStyle: 'solid',
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4A5568',
  },
  tableRow: {
    padding: 12,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    borderBottomStyle: 'solid',
  },
  tableCell: {
    flex: 1,
    fontSize: 13,
  },
  statusHealthy: {
    color: '#27AE60',
    fontWeight: 'bold',
  },
  statusAdvisory: {
    color: '#F2C94C',
    fontWeight: 'bold',
  },
  statusCritical: {
    color: '#EB5757',
    fontWeight: 'bold',
  },
  predictionsList: {
    backgroundColor: '#FEF5E7',
    borderLeftWidth: 4,
    borderLeftColor: '#F2C94C',
    borderLeftStyle: 'solid',
    padding: 16,
    borderRadius: 4,
  },
  predictionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    fontSize: 13,
    color: '#744210',
  },
  predictionItemIcon: {
    marginRight: 10,
    fontSize: 14,
  },
  recommendationsList: {
    flexDirection: "column",
  },
  recommendationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    borderBottomStyle: "solid",
  },
  recommendationNumber: {
    backgroundColor: "#2F80ED",
    color: "#ffffff",
    width: 20,
    height: 20,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 11,
    fontWeight: "bold",
    marginRight: 10,
    paddingTop: 2,
  },
  recommendationText: {
    flex: 1,
    fontSize: 13,
    color: "#1A202C",
  },
  offerBadge: {
    backgroundColor: "#27AE60",
    color: "#ffffff",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 10,
    fontWeight: 500,
  },
  historyGrid: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 10,
  },
  historyItem: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  historyIcon: {
    fontSize: 24,
    marginBottom: 8,
    paddingBottom: 5,
  },
  historyTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 13,
    color: '#718096',
    marginBottom: 4,
  },
  historyStatus: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
    fontSize: 10,
    color: '#27AE60',
    fontWeight: 'normal',
  },
  footer: {
    backgroundColor: '#1A202C',
    color: '#ffffff',
    padding: 20,
    textAlign: 'center',
  },
  disclaimer: {
    fontSize: 10,
    color: '#A0AEC0',
    marginBottom: 12,
    lineHeight: 1.4,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    fontSize: 12,
  },
  contactItem: {
    color: '#3B82F6',
    fontWeight: 'normal',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface CarHealthReportPDFProps {
  data: CarHealthData;
}

export const CarHealthReportPDF = ({ data }: CarHealthReportPDFProps) => {
  console.log("data", data)
  const getHealthZone = (score: string) => {
    const scoreNum = parseInt(score) || 0;
    if (scoreNum >= 80) return "Green Zone";
    if (scoreNum >= 60) return "Yellow Zone";
    return "Red Zone";
  };

  const getStatusStyle = (status: string) => {
    if (status === "healthy" || status === "good" || status === "normal" || status === "ok") return styles.statusHealthy;
    if (status === "weak" || status === "worn" || status === "medium") return styles.statusAdvisory;
    return styles.statusCritical;
  };

  return (
    <Document>
      <Page size={{ width: 595, height: 1920 }} style={styles.page}>
        <View style={styles.reportContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logo}>
              <Image
                src="/logo_mwg.png"
                style={{ width: 80, height: 40 }}
              />
            </View>
            <Text style={styles.headerTitle}>Car Health Report</Text>
            <View style={styles.headerRight}>
              <Text>{data.generatedDate}</Text>
              <Text>Report ID: {data.reportId}</Text>
            </View>
          </View>

          {/* Vehicle Information */}
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <View style={styles.sectionTitleBar} />
              <Text>Vehicle Information</Text>
            </View>
            <View style={styles.carDetails}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Car Owner:</Text>
                <Text style={styles.detailValue}>{data.ownerName || 'Not specified'}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Car:</Text>
                <Text style={styles.detailValue}>{data.carModel || 'Not specified'}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Registration:</Text>
                <Text style={styles.detailValue}>{data.registration || 'Not specified'}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Odometer:</Text>
                <Text style={styles.detailValue}>{data.odometer || 'Not specified'}</Text>
              </View>
            </View>
          </View>

          {/* Health Score */}
          {data.healthScore && (
            <View style={styles.section}>
              <View style={styles.sectionTitle}>
                <View style={styles.sectionTitleBar} />
                <Text>Overall Health Score</Text>
              </View>
              <View style={styles.healthScoreContainer}>
                <View style={styles.scoreGauge}>
                  <Svg width="120" height="120">
                    {/* Green arc (0–140 deg) */}
                    <Path
                      d="M60,10 A50,50 0 0,1 110,60"
                      stroke="#27AE60"
                      strokeWidth="15"
                      fill="none"
                    />
                    {/* Yellow arc (140–220 deg) */}
                    <Path
                      d="M110,60 A50,50 0 0,1 60,110"
                      stroke="#F2C94C"
                      strokeWidth="15"
                      fill="none"
                    />
                    {/* Red arc (220–360 deg) */}
                    <Path
                      d="M60,110 A50,50 0 0,1 10,60 A50,50 0 0,1 60,10"
                      stroke="#EB5757"
                      strokeWidth="15"
                      fill="none"
                    />
                  </Svg>

                  {/* Inner white circle for text */}
                  <View style={styles.gaugeInner}>
                    <Text style={styles.scoreNumber}>{data.healthScore}</Text>
                    <Text style={styles.scoreText}>out of 100</Text>
                  </View>
                </View>
                <View style={styles.scoreInfo}>
                  {
                    getHealthZone(data.healthScore) === "Green Zone" ? (
                      <Text style={[styles.scoreStatus, { color: '#27AE60' }]}>{getHealthZone(data.healthScore)}</Text>
                    ) : (
                      getHealthZone(data.healthScore) === "Yellow Zone" ? (
                        <Text style={[styles.scoreStatus, { color: '#F2C94C' }]}>{getHealthZone(data.healthScore)}</Text>
                      ) : (
                        <Text style={[styles.scoreStatus, { color: '#EB5757' }]}>{getHealthZone(data.healthScore)}</Text>
                      )
                    )
                  }
                  <Text style={styles.scoreDescription}>
                    Your car is in <Text style={{ fontWeight: 600 }}>{getHealthZone(data.healthScore)}</Text> and needs attention soon. Some components require monitoring and potential replacement in the coming months.
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Key Findings */}
          {/* {(data.batteryStatus || data.coolantTemp || data.engineCodes || data.tyreStatus) && ( */}
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <View style={styles.sectionTitleBar} />
              <Text>Key Findings</Text>
            </View>
            <View style={styles.findingsTable}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderCell}>Parameter</Text>
                <Text style={styles.tableHeaderCell}>Status</Text>
                <Text style={styles.tableHeaderCell}>Note</Text>
              </View>
              {/* {data.batteryStatus && ( */}
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>
                  <Image
                    src="/battery.png"
                    style={{ width: 13, height: 13 }}
                  /> Battery</Text>
                <Text style={[styles.tableCell, getStatusStyle(data.batteryStatus)]}>
                  {data.batteryStatus} {data.batteryVoltage && `- ${data.batteryVoltage}`}
                </Text>
                <Text style={styles.tableCell}>May need attention</Text>
              </View>
              {/* )} */}
              {/* {data.coolantTemp && ( */}
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}><Image
                  src="/Coolant.png"
                  style={{ width: 13, height: 13 }}
                /> Coolant Temp</Text>
                <Text style={[styles.tableCell, getStatusStyle(data.coolantStatus)]}>{data.coolantStatus} {data.coolantTemp && `- ${data.coolantTemp}`}</Text>
                <Text style={styles.tableCell}>All good</Text>
              </View>
              {/* )} */}
              {/* {data.engineCodes && ( */}
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}><Image
                  src="/engine-code.png"
                  style={{ width: 13, height: 13 }}
                /> Engine Codes</Text>
                <Text style={[styles.tableCell, styles.statusCritical]}>{data.engineCodes}</Text>
                <Text style={styles.tableCell}>Check recommended</Text>
              </View>
              {/* )} */}
              {/* {data.tyreStatus && ( */}
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}><Image
                  src="/tire.png"
                  style={{ width: 13, height: 13 }}
                /> Tyres</Text>
                <Text style={[styles.tableCell, getStatusStyle(data.tyreStatus)]}>{data.tyreStatus}</Text>
                <Text style={styles.tableCell}>Monitor condition</Text>
              </View>
              {/* )} */}
              {/* {data.lightsStatus && ( */}
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}><Image
                  src="/light.png"
                  style={{ width: 13, height: 13 }}
                /> Tyres</Text>
                <Text style={[styles.tableCell, getStatusStyle(data.lightsStatus)]}>{data.lightsStatus}</Text>
                <Text style={styles.tableCell}>Monitor condition</Text>
              </View>
              {/* )} */}
            </View>
          </View>
          {/* )} */}

          {/* Predictive Maintenance */}
          {data.predictiveNotes && data.predictiveNotes.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionTitle}>
                <View style={styles.sectionTitleBar} />
                <Text>Predictive Maintenance</Text>
              </View>
              <View style={styles.predictionsList}>
                {data.predictiveNotes.map((note, index) => (
                  <View key={index} style={styles.predictionItem}>
                    <Text style={styles.predictionItemIcon}>⚠️</Text>
                    <Text>{note}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Service Recommendations */}
          {data.serviceRecommendations && data.serviceRecommendations.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionTitle}>
                <View style={styles.sectionTitleBar} />
                <Text>Service Recommendations</Text>
              </View>

              <View style={styles.recommendationsList}>
                {data.serviceRecommendations.map((rec, index) => (
                  <View key={index} style={styles.recommendationItem}>
                    {/* Number bubble */}
                    <Text style={styles.recommendationNumber}>{index + 1}</Text>

                    {/* Recommendation Text */}
                    <Text style={styles.recommendationText}>{rec}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Service History */}
          {/* {(data.lastWash || data.lastScan || data.totalReports) && ( */}
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <View style={styles.sectionTitleBar} />
              <Text>Service History Snapshot</Text>
            </View>
            <View style={styles.historyGrid}>
              {/* {data.lastWash && ( */}
              <View style={styles.historyItem}>
                <Text style={styles.historyIcon}><Image
                  src="/last-wash.png"
                  style={{ width: 25, height: 25 }}
                /></Text>
                <Text style={styles.historyTitle}>Last Wash</Text>
                <Text style={styles.historyDate}>{data.lastWash}</Text>
                <Text style={styles.historyStatus}><Image
                  src="/complete.png"
                  style={{ width: 13, height: 13 }}
                /> Complete</Text>
              </View>
              {/* )} */}
              {/* {data.lastScan && ( */}
              <View style={styles.historyItem}>
                <Text style={styles.historyIcon}><Image
                  src="/health-check.png"
                  style={{ width: 25, height: 25 }}
                /></Text>
                <Text style={styles.historyTitle}>Last Health Scan</Text>
                <Text style={styles.historyDate}>{data.lastScan}</Text>
                <Text style={styles.historyStatus}><Image
                  src="/complete.png"
                  style={{ width: 13, height: 13 }}
                /> Complete</Text>
              </View>
              {/* )} */}
              {data.totalReports && (
                <View style={styles.historyItem}>
                  <Text style={styles.historyIcon}><Image
                    src="/store.png"
                    style={{ width: 25, height: 25 }}
                  /></Text>
                  <Text style={styles.historyTitle}>Reports Stored</Text>
                  <Text style={styles.historyDate}>Total: {data.totalReports}</Text>
                  <Text style={styles.historyStatus}><Image
                    src="/growing.png"
                    style={{ width: 13, height: 13 }}
                  /> Growing</Text>
                </View>
              )}
            </View>
          </View>
          {/* )} */}

          {/* Additional Notes */}
          {data.additionalNotes && (
            <View style={styles.section}>
              <View style={styles.sectionTitle}>
                <View style={styles.sectionTitleBar} />
                <Text>Additional Notes & Observations</Text>
              </View>
              <View style={styles.predictionsList}>
                <Text style={styles.predictionItem}>{data.additionalNotes}</Text>
              </View>
            </View>
          )}

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.disclaimer}>
              Disclaimer: This is an advisory health report based on OBD scan & visual checks.
              For confirmation, visit an authorized service center.
            </Text>
            <View style={styles.contactInfo}>
              {/* WhatsApp Link */}
    <Link src="https://wa.me/919429601299" style={styles.contactItem}>
      <Image src="/whatsapp.png" style={{ width: 16, height: 16, marginRight: 6 }} />
      <Text>WhatsApp</Text>
    </Link>

    {/* Call Link */}
    <Link src="tel:+919429601299" style={styles.contactItem}>
      <Image src="/call.png" style={{ width: 16, height: 16, marginRight: 6 }} />
      <Text>Call: +91 9429601299</Text>
    </Link>

    {/* Website Link */}
    <Link src="https://www.mrwhitegloves.com" style={styles.contactItem}>
      <Image src="/website.png" style={{ width: 16, height: 16, marginRight: 6 }} />
      <Text>Website</Text>
    </Link>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};