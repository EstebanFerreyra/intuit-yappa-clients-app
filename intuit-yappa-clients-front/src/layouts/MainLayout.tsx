import MenuAppBar from "../components/AppBar/MenuAppBar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div style={styles.container}>
      <MenuAppBar />
      <main style={styles.content}>{children}</main>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
  },
  content: {
    flex: 1,
    padding: "16px",
  },
};

export default MainLayout;
