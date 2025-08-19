import React from 'react';
import { ActionLink } from '../ActionLink';

export function BasicExample() {
  return (
    <div style={{ padding: '2rem', maxWidth: '600px' }}>
      <h2>Action Link Examples</h2>
      
      <h3>Basic Usage</h3>
      <ActionLink 
        text="Find your nearest A&E" 
        href="/find-services/accident-emergency" 
      />
      
      <h3>Opens in New Window</h3>
      <ActionLink 
        text="Visit NHS website" 
        href="https://www.nhs.uk" 
        openInNewWindow={true}
      />
      
      <h3>With Click Handler</h3>
      <ActionLink 
        text="Book an appointment" 
        href="/appointments/book"
        onClick={(event) => {
          console.log('Action link clicked:', event.currentTarget.href);
        }}
      />
      
      <h3>Multiple Action Links</h3>
      <ActionLink 
        text="Find a pharmacy" 
        href="/find-services/pharmacy" 
      />
      <ActionLink 
        text="Order a prescription" 
        href="/prescriptions/order" 
      />
      <ActionLink 
        text="Register with a GP" 
        href="/services/gp-registration" 
      />
    </div>
  );
}