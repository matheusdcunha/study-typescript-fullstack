import { useState } from "react";
import { format } from "date-fns";

//Roteamento
import { createFileRoute, Link } from "@tanstack/react-router";

//Validação
import { z } from "zod";

//Formulários
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import { isValidCpf } from "@/lib/is-cpf-valid";

//Componentes
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { TypographyH1 } from "@/components/ui/typography-h1";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

//Icons
import {
  ArrowLeft,
  CalendarIcon,
  Eye,
  EyeClosed,
  ArrowRight,
} from "lucide-react";

const formSchema = z
  .object({
    name: z.string({ message: "Campo obrigatório." }),
    lastName: z.string({ message: "Campo obrigatório." }),

    cpf: z
      .string()
      .transform(value => value.replace(/[^\d]/g, ""))
      .refine(isValidCpf, { message: "CPF inválido." }),
    birthDay: z.date({
      message: "Campo obrigatório.",
    }),
    email: z.email({ message: "Email inválido" }),
    password: z
      .string({ message: "Campo obrigatório." })
      .min(3, { message: "A senha precisa ter no mínimo 3 caracteres" }),
    passwordConfirmation: z.string({ message: "Campo obrigatório." }),
  })
  .refine(
    data => {
      return data.password === data.passwordConfirmation;
    },
    { message: "As senhas devem ser iguais.", path: ["passwordConfirmation"] },
  );

export const Route = createFileRoute("/_public/register")({
  component: RegisterView,
  head: () => ({
    meta: [
      {
        title: "Cadastro | Exebec",
      },
    ],
  }),
});

function RegisterView() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const registerWithMask = useHookFormMask(form.register);

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);

    const myPromise = new Promise<z.infer<typeof formSchema>>(() => {
      setTimeout(() => {}, 1000);
    });

    toast.promise(myPromise, {
      loading: "Cadastrando usuário...",
      success: ({ name }) => {
        return {
          message: `${name} foi cadastrado com sucesso!`,
        };
      },
      error: "Error",
    });
  }

  return (
    <div className="w-full max-w-sm flex flex-col">
      <TypographyH1 className="flex justify-center mb-8">
        Cadastre-se
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
          <CardTitle className="col-start-2">Crie sua conta</CardTitle>
          <CardDescription className="col-start-2">
            Informe seus dados abaixo para poder criar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel data-error={false}>Nome</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John"
                            autoComplete="name"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage className="absolute -bottom-5" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel data-error={false}>Sobrenome</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            autoComplete="lastName"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage className="absolute -bottom-5" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="cpf"
                    render={() => (
                      <FormItem className="relative">
                        <FormLabel data-error={false}>CPF</FormLabel>
                        <FormControl>
                          <Input
                            {...registerWithMask(
                              "cpf",
                              ["999.999.999-99", "99999-9999"],
                              {
                                showMaskOnFocus: false,
                                showMaskOnHover: false,
                                autoUnmask: true,
                                jitMasking: true,
                              },
                            )}
                            placeholder="000.000.000-00"
                          />
                        </FormControl>

                        <FormMessage className="absolute -bottom-5" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="birthDay"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel data-error={false}>
                          Data de Aniversário
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}>
                                {field.value ? (
                                  format(field.value, "P")
                                ) : (
                                  <span>Escolha uma data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={date =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage className="absolute -bottom-5" />
                      </FormItem>
                    )}
                  />
                </div>

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

                      <FormMessage className="absolute -bottom-5" />
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

                      <FormMessage className="absolute -bottom-5" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel data-error={false}>Confirmar senha</FormLabel>
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
                          onClick={() =>
                            setShowPasswordConfirmation(prev => !prev)
                          }
                          onMouseDown={e => e.preventDefault()}>
                          <div className="relative h-4 w-4">
                            <Eye
                              className={cn(
                                "absolute inset-0 transition-opacity duration-20",
                                showPasswordConfirmation
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                              aria-hidden="true"
                            />
                            <EyeClosed
                              className={cn(
                                "absolute inset-0 transition-opacity duration-200",
                                showPasswordConfirmation
                                  ? "opacity-0"
                                  : "opacity-100",
                              )}
                              aria-hidden="true"
                            />
                          </div>
                        </Button>
                      </div>

                      <FormMessage className="absolute -bottom-5" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  variant="default"
                  className="w-full h-12 cursor-pointer gap-4 flex flex-row items-center hover:pr-1">
                  Cadastrar
                  <ArrowRight />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
