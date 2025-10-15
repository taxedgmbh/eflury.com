#!/usr/bin/env python3
"""
German Translation Script for Emanuel Flury Website
Translates key content from English to German with Swiss terminology
"""

import re

# Translation mappings for key content
translations = {
    # Meta tags and titles
    "Automation Specialist & Swiss Tax Expert": "Automatisierungsspezialist & Schweizer Steuerexperte",
    "Swiss automation expert specializing in AI-driven finance solutions": "Schweizer Automatisierungsexperte spezialisiert auf KI-gestützte Finanzlösungen",
    "Swiss automation expert, AI finance consultant, Swiss tax advisor": "Schweizer Automatisierungsexperte, KI-Finanzberater, Schweizer Steuerberater",
    
    # Navigation
    "Home": "Startseite",
    "About": "Über mich",
    "Services": "Dienstleistungen", 
    "Portfolio": "Portfolio",
    "Contact": "Kontakt",
    
    # Hero section
    "Automation Specialist": "Automatisierungsspezialist",
    "Sharing insights on AI automation and Swiss tax optimization": "Einblicke in KI-Automatisierung und Schweizer Steueroptimierung",
    "Join 500+ professionals getting weekly automation tips": "Schliessen Sie sich 500+ Fachleuten an, die wöchentliche Automatisierungstipps erhalten",
    "Subscribe to Newsletter": "Newsletter abonnieren",
    "Stay Updated": "Aktuell bleiben",
    
    # Services
    "AI Automation": "KI-Automatisierung",
    "Swiss Tax Optimization": "Schweizer Steueroptimierung", 
    "Process Automation": "Prozessautomatisierung",
    "Financial Analytics": "Finanzanalytik",
    "Corporate Consulting": "Unternehmensberatung",
    
    # Company section
    "Company": "Unternehmen",
    "About Me": "Über mich",
    "Privacy": "Datenschutz",
    "Newsletter": "Newsletter",
    
    # Contact
    "Contact": "Kontakt",
    "Get Automation Insights": "Automatisierungseinblicke erhalten",
    "Weekly tips on Swiss tax optimization and AI trends": "Wöchentliche Tipps zur Schweizer Steueroptimierung und KI-Trends",
    "Enter your email": "E-Mail eingeben",
    
    # Footer
    "Services": "Dienstleistungen",
    "Company": "Unternehmen", 
    "Contact": "Kontakt",
    "AI Automation": "KI-Automatisierung",
    "Swiss Tax Optimization": "Schweizer Steueroptimierung",
    "Process Automation": "Prozessautomatisierung",
    "Financial Analytics": "Finanzanalytik",
    "Corporate Consulting": "Unternehmensberatung",
    "About": "Über mich",
    "Portfolio": "Portfolio",
    "Privacy": "Datenschutz",
    "Newsletter": "Newsletter",
    "Contact": "Kontakt",
    "me@eflury.com": "me@eflury.com",
    "Keltenweg 4, 2540 Grenchen, Switzerland": "Keltenweg 4, 2540 Grenchen, Schweiz",
    "Taxed GmbH": "Taxed GmbH",
    "All rights reserved": "Alle Rechte vorbehalten",
    
    # Professional content
    "Transforming Swiss businesses through AI automation": "Transformation Schweizer Unternehmen durch KI-Automatisierung",
    "Bridging traditional finance with cutting-edge technology": "Brücke zwischen traditioneller Finanzwelt und modernster Technologie",
    "Swiss Tax Law": "Schweizer Steuerrecht",
    "AI Implementation": "KI-Implementierung", 
    "Process Automation": "Prozessautomatisierung",
    "International Business": "Internationales Geschäft",
    "Financial Technology": "Finanztechnologie"
}

def translate_content(content):
    """Apply translations to content"""
    for english, german in translations.items():
        content = content.replace(english, german)
    return content

if __name__ == "__main__":
    print("German translation mappings created successfully!")
    print(f"Total translations: {len(translations)}")
