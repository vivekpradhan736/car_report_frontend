import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { CustomerData } from "./CustomerReportForm";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    color: '#374151',
  },
  header: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
    borderBottomStyle: 'solid',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  generatedDate: {
    fontSize: 10,
    color: '#9ca3af',
    marginTop: 8,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    borderBottomStyle: 'solid',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  column: {
    flex: 1,
    paddingRight: 15,
  },
  label: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 2,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 12,
    color: '#111827',
    fontWeight: 'normal',
  },
  metricsContainer: {
    backgroundColor: '#f9fafb',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderStyle: 'solid',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metricBox: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  metricLabel: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  revenueValue: {
    color: '#059669',
  },
  satisfactionValue: {
    color: '#d97706',
  },
  notesContainer: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    borderLeftStyle: 'solid',
  },
  notesText: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#374151',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: '#9ca3af',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    borderTopStyle: 'solid',
    paddingTop: 15,
  },
  companyInfo: {
    backgroundColor: '#eff6ff',
    padding: 15,
    borderRadius: 6,
    marginBottom: 20,
  },
  companyName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 4,
  },
});

interface CustomerReportPDFProps {
  data: CustomerData;
}

export const CustomerReportPDF = ({ data }: CustomerReportPDFProps) => {
  const formatCurrency = (value: string) => {
    if (!value) return 'N/A';
    const num = parseFloat(value.replace(/,/g, ''));
    return isNaN(num) ? value : `$${num.toLocaleString()}`;
  };

  const formatRating = (value: string) => {
    if (!value) return 'N/A';
    return `${value}/10`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Customer Report</Text>
          <Text style={styles.subtitle}>Professional Customer Analysis & Performance Review</Text>
          <Text style={styles.generatedDate}>
            Generated on {data.generatedDate}
          </Text>
        </View>

        {/* Company Information */}
        {data.company && (
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{data.company}</Text>
            <Text style={{ fontSize: 11, color: '#6b7280' }}>
              Customer: {data.customerName}
            </Text>
          </View>
        )}

        {/* Customer Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Customer Name</Text>
              <Text style={styles.value}>{data.customerName || 'Not specified'}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Company</Text>
              <Text style={styles.value}>{data.company || 'Not specified'}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Email Address</Text>
              <Text style={styles.value}>{data.customerEmail || 'Not provided'}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Phone Number</Text>
              <Text style={styles.value}>{data.customerPhone || 'Not provided'}</Text>
            </View>
          </View>
        </View>

        {/* Report Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Report Details</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Report Type</Text>
              <Text style={styles.value}>{data.reportType || 'Not specified'}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Report Period</Text>
              <Text style={styles.value}>{data.reportPeriod || 'Not specified'}</Text>
            </View>
          </View>
        </View>

        {/* Key Metrics */}
        {(data.totalRevenue || data.projectsCompleted || data.satisfactionRating) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Performance Metrics</Text>
            <View style={styles.metricsContainer}>
              <View style={styles.metricsRow}>
                <View style={styles.metricBox}>
                  <Text style={styles.metricLabel}>Total Revenue</Text>
                  <Text style={[styles.metricValue, styles.revenueValue]}>
                    {formatCurrency(data.totalRevenue)}
                  </Text>
                </View>
                <View style={styles.metricBox}>
                  <Text style={styles.metricLabel}>Projects Completed</Text>
                  <Text style={styles.metricValue}>
                    {data.projectsCompleted || 'N/A'}
                  </Text>
                </View>
                <View style={styles.metricBox}>
                  <Text style={styles.metricLabel}>Satisfaction Rating</Text>
                  <Text style={[styles.metricValue, styles.satisfactionValue]}>
                    {formatRating(data.satisfactionRating)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Additional Notes */}
        {data.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Notes & Observations</Text>
            <View style={styles.notesContainer}>
              <Text style={styles.notesText}>{data.notes}</Text>
            </View>
          </View>
        )}

        {/* Footer */}
        <Text style={styles.footer}>
          This report was generated automatically. All data is accurate as of the generation date.
          {'\n'}For questions or additional information, please contact our support team.
        </Text>
      </Page>
    </Document>
  );
};