import {
	Image,
	Modal,
} from 'react-bootstrap';

interface Props {
	open: boolean;
	onClose(): void;
	img: string;
	label: string;
	link: string;
}

export
function ImagePreview(props: Props) {
	const {
		img,
		label,
		link,
		open,
		onClose,
	} = props;

	return (
		<>
			<Modal
				show={open}
				onHide={onClose}
				dialogClassName="screenshot-preview"
			>
				<Modal.Header closeButton>
					<Modal.Title>
						<a href={link} target="__blank">
							{label}
						</a>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Image
						fluid
						rounded
						loading="lazy"
						src={img}
					/>
				</Modal.Body>
			</Modal>
		</>
	);
}
