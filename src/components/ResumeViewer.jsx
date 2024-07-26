import { usePortfolio } from "../hooks/globeVars";
const IzzathResume = () => {
    const { setShowPdf, showPdf, resuemBase64 } = usePortfolio();

    return (
        <div className="pdf-container">
            {showPdf && (
                <div className="my-resume">
                    <div className="resume-header">
                        <button onClick={() => setShowPdf(false)}>X</button>
                    </div>
                    <iframe
                        src={resuemBase64}
                        frameborder="0"
                        title="PDF Viewer"
                    >
                    </iframe>
                </div>
            )}
        </div>
    )
}
export default IzzathResume;