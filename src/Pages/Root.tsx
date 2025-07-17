import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Outlet, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function Root() {
    const signOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.href = 'auth';
    };
    return (
        <div className="flex">
            <div className="flex h-lvh w-[300px] flex-col bg-gray-300 p-3">
                <div className="flex h-[100px] items-center justify-center">
                    <Label htmlFor="todoweb" className="text-5xl text-cyan-500">
                        <Link to={`/`}> TodoWeb</Link>
                    </Label>
                </div>

                <div className="m-2 flex flex-col justify-items-center gap-3">
                    <Link to={`/`} className="flex h-[50px] cursor-pointer items-center rounded-2xl hover:bg-gray-200">
                        <Label htmlFor="App" className="ml-3 cursor-pointer text-[20px]">
                            Home
                        </Label>
                    </Link>
                    <Separator />
                    <Link
                        to={`/statistic`}
                        className="flex h-[50px] cursor-pointer items-center rounded-2xl hover:bg-gray-200"
                    >
                        <Label htmlFor="statistic" className="ml-3 cursor-pointer text-[20px]">
                            Statistic
                        </Label>
                    </Link>
                    <Separator />
                    <Link
                        to={`/restore`}
                        className="flex h-[50px] cursor-pointer items-center rounded-2xl hover:bg-gray-200"
                    >
                        <Label htmlFor="restore" className="ml-3 cursor-pointer text-[20px]">
                            Restore
                        </Label>
                    </Link>
                    <Separator />
                    <Button onClick={signOut}>Sign Out</Button>
                </div>
            </div>
            <div id="detail" className="flex-1">
                <Outlet />
            </div>
        </div>
    );
}

export default Root;
