import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateUserMutation } from "@/features/admin/sign/signApiSlice";
import { useState } from "react";
import { Link } from "react-router-dom";

export const description =
    "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account";

export const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // `useCreateUserMutation` 훅 사용
    const [createUser, { isLoading, isSuccess, error }] = useCreateUserMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // POST 요청을 보낼 데이터
            const userData = { username, email, password };
            await createUser(userData).unwrap();
            alert("User created successfully!");
        } catch (err) {
            console.error("Failed to create user", err);
        }
    };

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>Enter your information to create an account</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="grid gap-4" onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                        <Label htmlFor="last-name">name</Label>
                        <Input
                            id="last-name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Robinson"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="m@example.com"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Creating..." : "Sign Up"}
                    </Button>
                    {isSuccess && <p>User created successfully!</p>}
                    {error && <p>Error creating user: {error.toString()}</p>}
                </form>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/signIn" className="underline">
                        Sign in
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};
