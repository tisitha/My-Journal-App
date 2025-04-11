export default function NotFound() {
    return (
        <div className="flex w-screen h-screen justify-center">
            <h1 className="text-lg">Error : Invalid request! redirecting...</h1>
            <meta http-equiv="refresh" content="0;url=/" />
        </div>
    );
}
