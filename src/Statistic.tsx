import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';

function Statistic() {
    return (
        <div className="mt-[50px] flex items-center justify-center p-[20px]">
            <div className="bg-accent flex h-[700px] w-[900px] items-center justify-center rounded-3xl border-2 p-3">
                <div className="flex flex-col items-center justify-center gap-5">
                    <Label htmlFor="Thong ke" className="text-5xl">
                        Statistic
                    </Label>
                    <Input />
                    <Button variant="destructive" className="w-1/2">
                        Error
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Statistic;
