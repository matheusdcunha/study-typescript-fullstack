import { createFileRoute, Link } from "@tanstack/react-router";
//Icons
import { ArrowLeft } from "lucide-react";

//Componentes
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TypographyH1 } from "@/components/ui/typography-h1";

export const Route = createFileRoute("/_public/forgot-password")({
  component: ForgotPassword,
  head: () => ({
    meta: [
      {
        title: "Esqueceu a senha | Exebec",
      },
    ],
  }),
});

function ForgotPassword() {
  const toastHandle = () => {
    const myPromise = new Promise<{ name: string }>(resolve => {
      setTimeout(() => {
        resolve({ name: "email01@email.com" });
      }, 3000);
    });

    toast.promise(myPromise, {
      loading: "Enviando email de recuperação...",
      success: (data: { name: string }) => {
        return {
          message: `O email foi enviado com sucesso para ${data.name}.`,
        };
      },
      error: "Error no envio do email de recuperação",
    });
  };

  return (
    <div className="w-full max-w-sm flex flex-col">
      <TypographyH1 className="flex justify-center mb-8">
        Esqueceu sua senha?
      </TypographyH1>
      <Card>
        <CardHeader>
          <CardAction className="justify-self-start">
            <Link to="/">
              <Button
                variant="outline"
                className="cursor-pointer mb-6 hover:bg-zinc-200">
                <ArrowLeft />
                Voltar
              </Button>
            </Link>
          </CardAction>

          <CardTitle className="col-start-2">
            Informe o email da conta
          </CardTitle>
          <CardDescription className="col-start-2">
            Será enviado para este email um link para redefinir sua senha.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            variant="default"
            className="w-full h-12 cursor-pointer"
            onClick={toastHandle}>
            Enviar e-mail
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
