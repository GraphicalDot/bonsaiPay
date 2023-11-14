import React from "react";
import { zeroAddress } from "viem";

import { useZrpGetClaimId } from "../generated";
import tokens from "../assets/tokens.json";
import { Balance } from "./Balance";
import { Token } from "../libs/types";
import { sha256 } from 'js-sha256';

export type TokenData = {
  name: string;
  icon: string;
  address: `0x${string}`;
  decimals: number;
};

interface AccountProps {
  email: string | null;
  disabled: boolean;
  hideClaim?: boolean;
}

const Account: React.FC<AccountProps> = (props) => {
  const { email, disabled, hideClaim } = props;

  const digest = sha256.hex(email);
  const { data: ethClaimId } = useZrpGetClaimId({
    args: [`0x${digest}`, tokens["sepolia"][0].address],
  });

  const { data: usdcClaimId } = useZrpGetClaimId({
    args: [`0x${digest}`, tokens["sepolia"][0].address],
  });

  return (
    <>
      <div className="balance-container">
        <Balance
          identity={ethClaimId ?? zeroAddress}
          token={tokens["sepolia"][0] as Token}
          disabled={disabled}
          hideClaim={hideClaim}
        />
        <Balance
          identity={usdcClaimId ?? zeroAddress}
          token={tokens["sepolia"][1] as Token}
          disabled={disabled}
          hideClaim={hideClaim}
        />
      </div>
    </>
  );
};

export default Account;
