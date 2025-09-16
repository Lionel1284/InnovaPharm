import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getPerformance } from 'firebase/performance'; // nuevo
import { getAnalytics } from 'firebase/analytics'; // nuevo
import { environment } from '../environments/environment';

const app = initializeApp(environment.firebase);
const db = getFirestore(app);
const perf = getPerformance(app);
const analytics = getAnalytics(app); // esto solo funcionará en entorno real (no localhost)

export { app, db, perf, analytics };
