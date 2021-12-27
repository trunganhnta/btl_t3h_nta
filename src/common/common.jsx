import { Dialog, DialogContent } from "@mui/material";

export const AlertDialog = ({open,DialogContent,handleClose}) =>{
    return (
        <div>
 
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              {DialogContent }
            </DialogContent>
          </Dialog>
        </div>
      );
}