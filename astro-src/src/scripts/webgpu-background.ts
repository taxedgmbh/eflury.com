// WebGPU Background Renderer (Modern replacement for Three.js WebGL)
// Falls back to Three.js if WebGPU is not available

export async function initWebGPUBackground(containerId: string) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Check for WebGPU support
  if (!navigator.gpu) {
    console.log('WebGPU not available, falling back to Three.js');
    return null; // Will use Three.js fallback
  }

  try {
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      console.log('WebGPU adapter not available');
      return null;
    }

    const device = await adapter.requestDevice();
    const canvas = document.createElement('canvas');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    container.appendChild(canvas);

    const context = canvas.getContext('webgpu');
    if (!context) {
      console.log('WebGPU context not available');
      return null;
    }

    const format = navigator.gpu.getPreferredCanvasFormat();
    context.configure({
      device,
      format,
      alphaMode: 'premultiplied',
    });

    // WebGPU shader code for particle system
    const shaderCode = `
      @vertex
      fn vs_main(@builtin(vertex_index) vertexIndex: u32) -> @builtin(position) vec4<f32> {
        var pos = array<vec2<f32>, 3>(
          vec2<f32>(0.0, 0.5),
          vec2<f32>(-0.5, -0.5),
          vec2<f32>(0.5, -0.5)
        );
        return vec4<f32>(pos[vertexIndex], 0.0, 1.0);
      }

      @fragment
      fn fs_main() -> @location(0) vec4<f32> {
        return vec4<f32>(0.0, 0.5, 0.3, 0.6);
      }
    `;

    // Create shader module
    const shaderModule = device.createShaderModule({
      code: shaderCode,
    });

    // Create render pipeline
    const pipeline = device.createRenderPipeline({
      layout: 'auto',
      vertex: {
        module: shaderModule,
        entryPoint: 'vs_main',
      },
      fragment: {
        module: shaderModule,
        entryPoint: 'fs_main',
        targets: [{ format }],
      },
      primitive: {
        topology: 'triangle-list',
      },
    });

    // Render loop
    function render() {
      const commandEncoder = device.createCommandEncoder();
      const textureView = context.getCurrentTexture().createView();

      const renderPassDescriptor: GPURenderPassDescriptor = {
        colorAttachments: [
          {
            view: textureView,
            clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 0.0 },
            loadOp: 'clear',
            storeOp: 'store',
          },
        ],
      };

      const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
      passEncoder.setPipeline(pipeline);
      passEncoder.draw(3, 1, 0, 0);
      passEncoder.end();

      device.queue.submit([commandEncoder.finish()]);
      requestAnimationFrame(render);
    }

    render();

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  } catch (error) {
    console.log('WebGPU initialization failed:', error);
    return null; // Fallback to Three.js
  }
}

