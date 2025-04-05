// src/pages/FAQPage.tsx
// Corrected: Removed unused 'Box' import
import React from 'react';
import {
    Container, Typography, Accordion, AccordionSummary, AccordionDetails, Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuizIcon from '@mui/icons-material/Quiz'; // Icon for FAQ page

// Define your FAQ content here
const faqs = [
    {
        q: 'How does the app detect potential threats?',
        a: 'The app uses advanced AI models (LLMs and potentially Vision AI) to analyze various inputs like text messages, voice tone (if enabled), location context, nearby reported incidents, and time of day to assess risk levels in real-time.'
    },
    {
        q: 'Is my location tracked constantly?',
        a: 'Your location is used primarily when you actively use map features, request location-based tips, or trigger an emergency alert. Background location access might be requested for proactive alerts, but this typically requires explicit permission and can often be configured in the app settings. We prioritize your privacy.'
    },
    {
        q: 'How are emergency alerts sent?',
        a: 'When a high-risk situation is detected or you manually trigger an SOS, alerts containing your location and situation details (if available) can be sent to your pre-defined trusted contacts via SMS/push notification and potentially to local authorities, depending on the integration and your settings.'
    },
    {
        q: 'How accurate is the risk assessment?',
        a: 'The AI models are trained on diverse datasets, including crime reports and public safety databases, to provide the best possible assessment. However, no system is 100% perfect. It\'s designed as a tool to enhance awareness and provide guidance, not replace caution and judgment.'
    },
    {
        q: 'How do I add or manage my trusted contacts?',
        a: 'You can usually manage your trusted contacts within the app\'s Profile or Settings section. Look for options like "Emergency Contacts" or "Trusted Circle". (Note: This feature needs to be implemented).'
    },
    {
        q: 'Is my personal data secure?',
        a: 'We take data security very seriously. All personal data is encrypted, and we adhere to strict privacy policies. Anonymized and aggregated data might be used to improve the system and for broader safety insights, but individual identifiable information is protected.'
    },
    {
        q: 'Does the app work without an internet connection?',
        a: 'Core features like AI analysis, real-time risk mapping, and receiving new alerts require an internet connection. Some basic functionalities, like accessing previously downloaded tips or manually triggering an SMS-based SOS (if configured), might work offline.'
    }
];

const FAQPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}> {/* Add vertical padding */}
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
            textAlign: 'center',
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'primary.dark' // Use a theme color
        }}
      >
        <QuizIcon sx={{ fontSize: '2.2rem', mr: 1, color: 'primary.main' }} />
        Frequently Asked Questions
      </Typography>

      <Paper elevation={2} sx={{ p: { xs: 0, sm: 1 } }}> {/* Remove padding on xs if using square accordions */}
          {/* Map through the faqs array to create Accordion components */}
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              elevation={0} // Use elevation 0 for cleaner look inside Paper
              square // Remove rounded corners for seamless look
              sx={{
                  // Add border styling for separation
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:not(:last-child)': { borderBottom: 0 }, // Avoid double border
                  '&:before': { display: 'none' }, // Remove default top border line
              }}
             >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`faq-panel${index}-content`}
                id={`faq-panel${index}-header`}
                sx={{
                    '& .MuiAccordionSummary-content': { my: 1.5 }, // Add vertical margin
                    '&:hover': { backgroundColor: 'action.hover' } // Subtle hover effect
                }}
              >
                {/* Question Text */}
                <Typography sx={{ fontWeight: 500, color: 'text.primary' }}>{faq.q}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: 'background.default' }}> {/* Slightly different background */}
                {/* Answer Text */}
                <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>{faq.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
      </Paper>
    </Container>
  );
};

export default FAQPage;