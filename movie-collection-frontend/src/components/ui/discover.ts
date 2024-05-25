import styled from "styled-components";

export const SideMenu = styled.div`
  width: 200px;
`;

export const MainContent = styled.div`
  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
  height: 100%;
  width: 95%;
  margin: 0 auto;

  
`;

export const GenreButton = styled.button<{ selected: boolean }>`
  ${({ selected }) =>
    selected
      ? `
    background-color: #e2e8f0; // Tailwind CSS class bg-stone-200 equivalent
    border-color: #e2e8f0;
    color: black;
    &:hover {
      background-color: #CBD5E0;
    }
  `
      : `
    &:hover {
      border-color: #e2e8f0;
    }
  `}
`;
