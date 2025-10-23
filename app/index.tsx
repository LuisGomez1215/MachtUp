import { Redirect } from 'expo-router';

export default function Index() {
  // Usar Redirect en lugar de useRouter + useEffect
  return <Redirect href="/auth/login" />;
}