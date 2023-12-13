import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography/Typography";

export default function Page() {
    return (
      <>
      <Grid container >
        <Grid xs={11} sm={9} md={7} lg={5} margin="auto">
          <Card style={{ width: 954, height: 450 }}>
              <CardContent>
                <Typography variant="h5" component="div" style={{ textAlign: 'center', fontSize: 23}}>
                  Cadastro de Cartão de Crédito
                </Typography>
                <TextField
                  label={"Nome no Cartão*"}
                  fullWidth
                  size="small"
                  style={{ margin: '10px 0' }}
                />
                <TextField
                  label={"Numero do Cartão*"}
                  fullWidth
                  size="small"
                  style={{ margin: '10px 0' }}
                />
                <TextField
                  label={"Data de Nascimento*"}
                  fullWidth
                  size="small"
                  style={{ margin: '10px 0' }}
                />
                <TextField 
                  label={"CVV*"}
                  fullWidth
                  size="small"
                  style={{ margin: '10px 0' }} />

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <Button variant="contained" style={{ backgroundColor: '#D95D56', color: '#FFFFFF' }}>
                    Cancelar
                  </Button>
                  <Button variant="contained" style={{ backgroundColor: '#8CD087', color: '#FFFFFF', 'marginLeft': 0 }}>
                    Salvar
                  </Button>
                </div>
              </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
