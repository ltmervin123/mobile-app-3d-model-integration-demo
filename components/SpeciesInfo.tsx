import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { Species } from '../data/species';

interface SpeciesInfoProps {
  species: Species;
}

const conservationConfig = {
  "Least Concern": { label: "Least Concern", bg: "#ecfdf5", text: "#047857", border: "#a7f3d0", dot: "#10b981", level: 1 },
  "Near Threatened": { label: "Near Threatened", bg: "#f7fee7", text: "#4d7c0f", border: "#d9f99d", dot: "#84cc16", level: 2 },
  "Vulnerable": { label: "Vulnerable", bg: "#fffbeb", text: "#b45309", border: "#fde68a", dot: "#f59e0b", level: 3 },
  "Endangered": { label: "Endangered", bg: "#fff7ed", text: "#c2410c", border: "#fed7aa", dot: "#f97316", level: 4 },
  "Critically Endangered": { label: "Critically Endangered", bg: "#fef2f2", text: "#b91c1c", border: "#fecaca", dot: "#ef4444", level: 5 },
};

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardLabel}>{label}</Text>
        <Text style={styles.cardValue}>{value}</Text>
      </View>
    </View>
  );
}

export default function SpeciesInfo({ species }: SpeciesInfoProps) {
  const conservation = conservationConfig[species.conservationStatus];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.badge}>
          <Ionicons name="leaf" size={12} color="#4338ca" />
          <Text style={styles.badgeText}>Species Profile</Text>
        </View>
        <Text style={styles.title}>{species.commonName}</Text>
        <Text style={styles.subtitle}>{species.scientificName}</Text>
      </View>

      {/* Conservation Status */}
      <View style={styles.conservationContainer}>
        <View style={styles.conservationHeader}>
          <View style={styles.conservationTitleGroup}>
            <Ionicons name="shield-checkmark" size={18} color="#374151" />
            <Text style={styles.conservationTitle}>Conservation Status</Text>
          </View>
          <View style={[styles.statusPill, { backgroundColor: conservation.bg, borderColor: conservation.border }]}>
            <View style={[styles.dot, { backgroundColor: conservation.dot }]} />
            <Text style={[styles.statusText, { color: conservation.text }]}>{conservation.label}</Text>
          </View>
        </View>

        {/* Risk Scale */}
        <View style={styles.riskScale}>
          {[1, 2, 3, 4, 5].map((step) => (
            <View key={step} style={[styles.riskStep, { backgroundColor: step <= conservation.level ? conservation.dot : '#e5e7eb' }]} />
          ))}
        </View>
        <View style={styles.riskLabels}>
          <Text style={styles.riskLabelText}>Safe</Text>
          <Text style={styles.riskLabelText}>At Risk</Text>
        </View>
      </View>

      {/* Classification Cards */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Classification & Habitat</Text>
        <View style={styles.row}>
          <InfoCard icon={<MaterialCommunityIcons name="family-tree" size={20} color="#4b5563" />} label="Family" value={species.family} />
        </View>
        <View style={styles.row}>
          <InfoCard icon={<Feather name="list" size={20} color="#4b5563" />} label="Order" value={species.order} />
        </View>
        <View style={styles.row}>
          <InfoCard icon={<Ionicons name="earth" size={20} color="#4b5563" />} label="Habitat" value={species.habitat} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  content: { padding: 24, paddingBottom: 40 },
  header: { marginBottom: 24 },
  badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e0e7ff', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16, marginBottom: 8, borderWidth: 1, borderColor: '#c7d2fe' },
  badgeText: { fontSize: 12, fontWeight: '600', color: '#4338ca', marginLeft: 4 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#111827' },
  subtitle: { fontSize: 16, fontStyle: 'italic', color: '#6b7280', marginTop: 4 },
  conservationContainer: { backgroundColor: '#f9fafb', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 24 },
  conservationHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  conservationTitleGroup: { flexDirection: 'row', alignItems: 'center' },
  conservationTitle: { fontSize: 14, fontWeight: '600', color: '#374151', marginLeft: 8 },
  statusPill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16, borderWidth: 1 },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
  statusText: { fontSize: 12, fontWeight: '600' },
  riskScale: { flexDirection: 'row', gap: 4, marginTop: 16 },
  riskStep: { flex: 1, height: 6, borderRadius: 3 },
  riskLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  riskLabelText: { fontSize: 10, fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase' },
  section: { gap: 12 },
  sectionTitle: { fontSize: 12, fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', marginBottom: 4, letterSpacing: 1 },
  row: { flex: 1 },
  card: { flexDirection: 'row', backgroundColor: '#fafafa', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#e5e7eb', alignItems: 'flex-start' },
  iconContainer: { width: 36, height: 36, borderRadius: 8, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  cardTextContainer: { flex: 1 },
  cardLabel: { fontSize: 11, fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', marginBottom: 2 },
  cardValue: { fontSize: 14, color: '#111827', lineHeight: 20 },
});