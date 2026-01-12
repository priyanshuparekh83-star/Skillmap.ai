import React, { useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Maximize2, Minimize2, Share2, Info, RotateCcw } from 'lucide-react';

const SkillGraph = ({ data, height = 400, theme = 'dark' }) => {
    const graphRef = useRef();
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 600, height });

    // Handle resizing
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: isFullscreen ? window.innerHeight - 100 : height
                });
            }
        };

        window.addEventListener('resize', updateDimensions);
        updateDimensions();

        // Slight delay to ensure container is rendered
        setTimeout(updateDimensions, 100);

        return () => window.removeEventListener('resize', updateDimensions);
    }, [isFullscreen, height]);

    const handleNodeClick = (node) => {
        // Center view on node with gentle zoom
        graphRef.current.centerAt(node.x, node.y, 1000);
        graphRef.current.zoom(1.2, 1000);
    };

    const handleShare = () => {
        const shareData = {
            title: 'Skill Gap Analysis',
            text: 'Check out my career roadmap on SkillMap.ai',
            url: window.location.href
        };

        if (navigator.share) {
            navigator.share(shareData).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    return (
        <div
            ref={containerRef}
            className={`
                bg-[var(--bg-secondary)] rounded-xl border border-[var(--glass-border)] relative overflow-hidden transition-all duration-300 shadow-sm
                ${isFullscreen ? 'fixed inset-4 z-50 flex flex-col shadow-2xl scale-100' : 'w-full'}
            `}
            style={{ height: isFullscreen ? 'auto' : `${height}px` }}
        >
            {/* Header / Controls */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 pointer-events-none">
                <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-blue)]"></span>
                    Skill Knowledge Graph
                </h3>
            </div>

            <div className="absolute top-4 right-4 z-10 flex gap-2">
                <button
                    onClick={handleShare}
                    className="p-1.5 rounded bg-[var(--bg-primary)] hover:bg-[var(--glass-border)] text-[var(--text-secondary)] transition-colors border border-[var(--glass-border)]"
                    title="Share Analysis"
                >
                    <Share2 size={14} />
                </button>
                <button
                    onClick={() => {
                        graphRef.current.zoomToFit(400);
                    }}
                    className="p-1.5 rounded bg-[var(--bg-primary)] hover:bg-[var(--glass-border)] text-[var(--text-secondary)] transition-colors border border-[var(--glass-border)]"
                    title="Reset View"
                >
                    <RotateCcw size={14} />
                </button>
                <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-1.5 rounded bg-[var(--bg-primary)] hover:bg-[var(--glass-border)] text-[var(--text-secondary)] transition-colors border border-[var(--glass-border)]"
                >
                    {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
            </div>

            {/* Graph */}
            <ForceGraph2D
                ref={graphRef}
                width={dimensions.width}
                height={dimensions.height}
                graphData={data}
                nodeLabel="name"
                nodeRelSize={6}

                // Balanced Physics
                d3VelocityDecay={0.3}
                d3AlphaDecay={0.01}
                cooldownTicks={100}
                onEngineStop={() => {
                    if (graphRef.current) {
                        graphRef.current.zoomToFit(400, 50);
                    }
                }}

                // Simple Clean Nodes
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const label = node.name;
                    const fontSize = 12 / globalScale;
                    ctx.font = `500 ${fontSize}px Inter, sans-serif`;

                    let color = '#94a3b8';

                    if (node.group === 'user') color = '#3b82f6';
                    if (node.group === 'target') color = '#ef4444';
                    if (node.group === 'skill') color = '#10b981';
                    if (node.group === 'category') color = '#a855f7';

                    const size = 6;

                    // Simple Circle
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);
                    ctx.fillStyle = color;
                    ctx.fill();

                    // Subtle White Border
                    ctx.lineWidth = 1.5;
                    ctx.strokeStyle = theme === 'dark' ? 'rgba(255,255,255,0.8)' : '#fff';
                    ctx.stroke();

                    // Label below
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillStyle = theme === 'dark' ? '#e2e8f0' : '#1e293b';
                    ctx.fillText(label, node.x, node.y + size + 4);
                }}

                // DYNAMIC LINKS
                linkColor={() => theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
                linkWidth={1}
                linkDirectionalParticles={4} // Dynamic Particles
                linkDirectionalParticleWidth={2}
                linkDirectionalParticleSpeed={0.005} // Flow speed
                linkDirectionalParticleColor={() => theme === 'dark' ? '#ffffff' : '#3b82f6'} // White particles in dark mode

                onNodeClick={handleNodeClick}
                backgroundColor="rgba(0,0,0,0)"
            />

            {/* Legend */}
            <div className="absolute bottom-4 left-4 z-10 px-3 py-2 rounded-md bg-[var(--bg-primary)]/90 border border-[var(--glass-border)] shadow-sm text-[10px] font-medium text-[var(--text-secondary)] flex gap-4">
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 border border-white/20"></span>
                    <span>Acquired</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 border border-white/20"></span>
                    <span>Gap</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500 border border-white/20"></span>
                    <span>Category</span>
                </div>
            </div>
        </div>
    );
};

export default SkillGraph;
