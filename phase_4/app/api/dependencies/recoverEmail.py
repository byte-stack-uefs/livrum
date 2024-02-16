import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dependencies.security import get_password_hash
import random
import string
class RecoverEmail:
    
    def emailRecover(email, password):
        
        smtp_server = 'smtp-mail.outlook.com.'
        smtp_port = 587 

        remetente = 'livrum@hotmail.com'  
        senha = '@uefs1234'

        msg = MIMEMultipart()
        msg['From'] = remetente
        msg['To'] = email
        msg['Subject'] = 'Recuperação de Senha'

        corpo_email = RecoverEmail.generateEmailBody(password)

        msg.attach(MIMEText(corpo_email, 'html'))

        try:
            server = smtplib.SMTP(smtp_server, smtp_port)
            server.starttls()  
            server.login(remetente, senha)
            server.sendmail(remetente, email, msg.as_string())
            server.quit() 
            return True
        except Exception as e:
            return False

    def generateRandomPassword():

        alphabet = string.ascii_letters + string.digits + string.punctuation
        password =  ''.join(random.choice(alphabet) for i in range(10))
        passToHash = get_password_hash(password)

        return password

    def generateEmailBody(password):
        return f"""
        <p>Você solicitou uma recuperação de senha.</p>
        <p>Esta é a sua senha temporária de acesso: <strong>{password}</strong>. Por favor, entre na sua conta para alterar a sua senha.</p>
        """
             
