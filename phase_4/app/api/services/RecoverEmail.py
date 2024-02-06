import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
class RecoverEmail:
    def emailRecover(email, password):
        
        smtp_server = 'smtp.gmail.com'
        smtp_port = 587 

        remetente = 'emaildolivrum@gmail.com' ##tem que fazer 
        senha = 'senhadolivrum'##tem que fazer 
        destinatario = email

        msg = MIMEMultipart()
        msg['From'] = remetente
        msg['To'] = destinatario
        msg['Subject'] = 'Recuperação de Senha'

        corpo_email = f"""
        <p>Você solicitou uma recuperação de senha.</p>
        <p>Esta é a sua senha temporaria de acesso <strong>{password}</strong> entre na sua conta para redefinir sua senha.</p>
        """
        msg.attach(MIMEText(corpo_email, 'html'))

        try:
            server = smtplib.SMTP(smtp_server, smtp_port)
            server.starttls()  
            server.login(remetente, senha)
            server.sendmail(remetente, destinatario, msg.as_string())
            return True
        except Exception as e:
            return False
        finally:
            server.quit()  
