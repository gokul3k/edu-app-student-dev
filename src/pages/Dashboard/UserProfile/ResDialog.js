import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "components/Resume";

export default function ResDialog({open,handleClose,profileInfo}) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


  return (
      <Dialog
        // fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
      
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <PDFDownloadLink
                      document={<MyDocument data={profileInfo} />}
                      fileName="resume.pdf"
                    >
                      {({ blob, url, loading, error }) =>
                        loading ? (
                          "Please wait, generating resume"
                        ) : (
                            <Typography>
                              Click here to  download Resume
                            </Typography>
                          )
                      }
                    </PDFDownloadLink>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            close
          </Button>
        </DialogActions>
      </Dialog>
  );
}