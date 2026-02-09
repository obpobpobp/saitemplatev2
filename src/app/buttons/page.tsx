/**
 * Button System Test Page
 * 
 * Comprehensive showcase of all button variants, colors, sizes, and states
 */

import { ButtonsContent } from './ButtonsContent';

// Force dynamic rendering to avoid SSR issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function ButtonsPage() {
  return <ButtonsContent />;
}
