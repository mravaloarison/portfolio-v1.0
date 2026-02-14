import { Box, Button, Grid, Typography } from "@mui/joy";
import { ListOfTechnologies } from "./FakeDb";
import Technology from "./Technology";
import { useState } from "react";

import { Modal } from "@mui/joy";
import ModalProjectDetail from "./ModalProjectDetail";

export default function ProjectElement({ name, description, technologies }) {
	const LOT = ListOfTechnologies;

	const [open, setOpen] = useState(false);

	return (
		<Grid xs={12} sm={6}>
			{/* <Sheet color="neutral" variant="soft">
				<img
					src="https://images.unsplash.com/photo-1719937206498-b31844530a96?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt={name}
					width="100%"
					height="auto"
				/>
			</Sheet> */}

			<Button sx={{ px: 0 }} variant="link" onClick={() => setOpen(true)}>
				<Typography
					level="title-md"
					sx={{
						textDecoration: "underline",
					}}
				>
					{name}
				</Typography>
			</Button>
			<Box sx={{ pb: 0.6 }}>
				{technologies.map((technology) => (
					<Technology
						key={technology}
						name={technology}
						icon={LOT.find((el) => el.name === technology).icon}
					/>
				))}
			</Box>
			<Typography level="body-sm">{description}</Typography>

			<Modal
				aria-labelledby="close-modal-title"
				open={open}
				onClose={(_event, reason) => {
					setOpen(false);
				}}
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<ModalProjectDetail name={name} />
			</Modal>
		</Grid>
	);
}
