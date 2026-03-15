import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Tabs, TabsContent, TabsList, TabsTrigger
} from "../components/ui/tab";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle
} from "../components/ui/card";

export default function Home() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [roomId, setRoomId] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreateRoom = async () => {
        if (!name) {
            alert("Please enter your name");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post("http://localhost:8080/createroom", { name });
            const data = res.data;

            if (!data.success) {
                alert("Failed to create room");
                return;
            }

            const { roomId, userId } = data;
            localStorage.setItem("userId", userId);
            navigate(`/room/${roomId}`);

        } catch (err) {
            console.error(err);
            alert("Failed to create room");
        } finally {
            setLoading(false);
        }
    };

    const handleJoinRoom = async () => {
        if (!roomId) {
            alert("Please enter room ID");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post("http://localhost:8080/checkroom", { roomId });

            if (!res.data.success) {
                alert(res.data.message);
                return;
            }

            navigate(`/room/${roomId}`);
        } catch (err) {
            console.error(err);
            alert("Error checking room");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50/50 p-4">
            <Card className="w-[400px] shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold tracking-tight">
                        Chat Server
                    </CardTitle>
                    <CardDescription>
                        Create a new room or join an existing one
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="create" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="create">Create Room</TabsTrigger>
                            <TabsTrigger value="join">Join Room</TabsTrigger>
                        </TabsList>

                        <TabsContent value="create" className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <Button
                                className="w-full"
                                onClick={handleCreateRoom}
                                disabled={loading}
                            >
                                {loading ? "Creating..." : "Create Room"}
                            </Button>
                        </TabsContent>

                        <TabsContent value="join" className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    placeholder="Enter room ID"
                                    value={roomId}
                                    onChange={(e) => setRoomId(e.target.value)}
                                />
                            </div>
                            <Button
                                className="w-full"
                                onClick={handleJoinRoom}
                                disabled={loading}
                            >
                                {loading ? "Checking..." : "Join Room"}
                            </Button>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}