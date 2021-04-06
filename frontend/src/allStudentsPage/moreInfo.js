import Modal from '@material-ui/core/Modal';
function MoreInfo({  }) {

	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
	  setOpen(true);
	};

	const handleClose = () => {
	  setOpen(false);
	};
	return(
		<Modal
		open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
			<div>
				Some text
			</div>
		</Modal>
	);
}

export default MoreInfo;