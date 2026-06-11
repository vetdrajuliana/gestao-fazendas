import Home from "../page";

export const metadata = {
  title: "App | Gestao de Fazendas",
  description: "Area oculta para ajustes do app de gestao agropecuaria.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AppPage() {
  return <Home />;
}
