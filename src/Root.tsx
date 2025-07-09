import { Button } from './components/ui/button';
import { Label } from './components/ui/label';
import { Separator } from './components/ui/separator';
import { Outlet, Link, useOutlet } from 'react-router-dom';

function Root() {
    const outlet = useOutlet();

    return (
        <div className="flex">
            <div className="flex h-lvh w-[300px] flex-col bg-gray-300 p-3">
                <div className="flex h-[100px] items-center justify-center">
                    <Label htmlFor="todoweb" className="text-5xl text-cyan-500">
                        <Link to={`/`}> TodoWeb</Link>
                    </Label>
                </div>

                <div className="m-2 flex flex-col justify-items-center gap-3">
                    <Link
                        to={`/app`}
                        className="flex h-[50px] cursor-pointer items-center rounded-2xl hover:bg-gray-200"
                    >
                        <Label htmlFor="App" className="ml-3 cursor-pointer text-[20px]">
                            App
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
                </div>
            </div>
            {!outlet && (
                <div className="mt-[400px] flex h-full w-[1040px] items-center">
                    <div className="flex flex-col items-center gap-3">
                        <Label htmlFor="heding-text" className="ml-[30px] text-4xl">
                            Build your Component Library
                        </Label>
                        <p className="flex items-center justify-center text-center">
                            A set of beautifully-designed, accessible components and a code distribution platform.
                            <br /> Works with your favorite frameworks. Open Source. Open Code.
                        </p>
                        <div className="flex gap-5">
                            <Button className="cursor-pointer">Get Started</Button>
                            <Button variant="outline" className="cursor-pointer">
                                Browse Blocks
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            <div id="detail">
                <Outlet />
            </div>
        </div>
    );
}

export default Root;
