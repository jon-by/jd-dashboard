import styled from "styled-components";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

export const ConfigWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  padding: 20px;
`;

export const CostsWrapper = styled.div`
  display: flex;
  min-width: 30%;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

export const BannedControl = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`;

export const Panel = styled.div`
  height: calc(100% - 48px);
`;

export const Content = styled(Box)`
  height: 100%;
`;

export const SongsToBanWrapper = styled.div``;

export const CostConfigWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const ConfigForm = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

export const ConfigActions = styled.div`
  flex-shrink: 0;
  padding: 20px;
  display: flex;
  flex-shrink: 0;
  justify-content: flex-end;
`;

export const ButtonStyled = styled(Button)`
  font-weight: bold;
`;

export const GameConfig = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const GeneralConfig = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
