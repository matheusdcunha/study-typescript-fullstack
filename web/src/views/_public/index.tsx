//Roteamento
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

//Validação
import { z } from "zod";

//Formulários
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

//Componentes
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TypographyH1 } from "@/components/ui/typography-h1";
import { Eye, EyeClosed } from "lucide-react";
import { cn } from "@/lib/utils";

const loginSearchSchema = z.object({
  redirect: z.string().optional().catch(undefined),
});

const formSchema = z.object({
  email: z.email({ message: "Email inválido" }),
  password: z
    .string()
    .min(3, { message: "A senha precisa ter no mínimo 3 caracteres" }),
});

export const Route = createFileRoute("/_public/")({
  component: Index,
  validateSearch: search => {
    return loginSearchSchema.parse(search);
  },
  head: () => ({
    meta: [
      {
        title: "Login | Exebec",
      },
    ],
  }),
});

function Index() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const { email, password } = data;

    const myPromise = new Promise<z.infer<typeof formSchema>>(resolve => {
      setTimeout(() => {
        sessionStorage.setItem("authToken", "JWT-EXAMPLE");
        resolve({ email, password });
        navigate({ to: redirect || "/home" });
      }, 3000);
    });

    toast.promise(myPromise, {
      loading: "Validando usuário...",
      success: ({ email }) => {
        return {
          message: `${email} foi validado com sucesso!`,
        };
      },
      error: "Error",
    });
  }

  return (
    <div className="w-full max-w-sm flex flex-col">
      <TypographyH1 className="flex justify-center mb-8">Exebec</TypographyH1>
      <Card>
        <CardHeader>
          <CardTitle>Acesse sua conta</CardTitle>
          <CardDescription>
            Informe seus dados abaixo para entra com a sua conta.
          </CardDescription>
          <CardAction className="ml-4">
            <Link to="/register">
              <Button
                variant="default"
                className="cursor-pointer bg-blue-500 hover:bg-blue-600">
                Cadastre-se
              </Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-8">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel data-error={false}>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email@exemplo.com"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage className="absolute -bottom-6" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel data-error={false}>Senha</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            className="pr-10"
                            placeholder="*******"
                            autoComplete="current-password"
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent  cursor-pointer"
                          onClick={() => setShowPassword(prev => !prev)}
                          onMouseDown={e => e.preventDefault()}>
                          <div className="relative h-4 w-4">
                            <Eye
                              className={cn(
                                "absolute inset-0 transition-opacity duration-20",
                                showPassword ? "opacity-100" : "opacity-0",
                              )}
                              aria-hidden="true"
                            />
                            {/* Ícone de Olho Fechado */}
                            <EyeClosed
                              className={cn(
                                "absolute inset-0 transition-opacity duration-200",
                                showPassword ? "opacity-0" : "opacity-100",
                              )}
                              aria-hidden="true"
                            />
                          </div>
                        </Button>
                      </div>

                      <FormMessage />
                      <FormDescription className=" text-zinc-950 justify-self-end">
                        <Link
                          to="/forgot-password"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                          Esqueceu sua senha ?
                        </Link>
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  variant="default"
                  className="w-full h-12 cursor-pointer bg-slate-950 flex-col gap-2">
                  Login
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        {/* <CardFooter className="flex-col gap-2"></CardFooter> */}
      </Card>
    </div>
  );
}
