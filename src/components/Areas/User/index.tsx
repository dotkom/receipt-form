import React, { useState } from "react";
import styled from "styled-components";

import { FieldSet } from "components/FieldSet";
import { ReceiptTextField } from "components/Input/ReceiptTextField";

import { CreateSignature } from "./CreateSignature";
import { LoginText } from "./Logintext";
import { SignatureInput } from "./SignatureInput";

const InfoFieldSet = styled(FieldSet)`
  grid-template-columns: 1fr;
`;

export const UserInfo = () => {
	const [editMode, setEditMode] = useState(false);
	return (
		<>
			<InfoFieldSet>
				<LoginText />
			</InfoFieldSet>
			<FieldSet>
				<ReceiptTextField
					label="Navn"
					field="fullname"
					placeholder="Ditt fulle navn"
				/>
				<ReceiptTextField
					label="E-post"
					field="email"
					placeholder="Din e-postadresse. Onlinemail hvis du har"
				/>
			</FieldSet>
			{editMode ? (
				<CreateSignature editClick={() => setEditMode(false)} />
			) : (
				<SignatureInput editClick={() => setEditMode(true)} />
			)}
		</>
	);
};
