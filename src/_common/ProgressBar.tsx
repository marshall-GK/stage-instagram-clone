// components/ProgressBar.js
import styled from 'styled-components';
import React from 'react';
const ProgressWrapper = styled.div`
  top: 10px;
  width: 100%;
  display: flex;
  background-color: grey;
`;

interface ProgressProps {
  width: number;
}

const Progress = styled.div<ProgressProps>`
  height: 5px;
  width: ${({ width }: any) => width}%;
  background-color: white;
  transition: width 0.1s linear;
`;

const ProgressBar = ({ progress }: any) => {
  return (
    <ProgressWrapper>
      <Progress width={progress} />
    </ProgressWrapper>
  );
};

export default ProgressBar;
