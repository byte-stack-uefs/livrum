import Footer from "../components/Footer";
import { theme } from '../theme';
export default function Layout({ children }: { children: React.ReactNode }) {
        return <div> <div>
          {children}  
        </div>
        <Footer email={process.env.APP_EMAIL} company={process.env.COMPANY} theme={theme}>
      
      </Footer>
        </div>;}