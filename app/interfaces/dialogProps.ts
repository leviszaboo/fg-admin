export interface DialogProps {
  id: string;
  dialogOpen: boolean;
  setDialogOpen(open: boolean): void;
}

export interface EditPicturesDialogProps extends DialogProps {
  urls: string[];
}
